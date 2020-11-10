import {Request, Response, Router} from "express";
import { ErrorHandler, handleError } from './../error';
import auth_token from '../middlewares/auth/auth.midd';
import Contact from "../models/contact";
import postContactValidations from '../middlewares/validators/contact/post';
import putContactValidations from '../middlewares/validators/contact/put';
import validator from '../middlewares/validator';

const router   = Router();

router.get("/", auth_token, async (req: Request, res: Response) => {
    try {
        const contacts = await Contact.find({user: req.user?.id}).sort({date: -1});
        return res.status(200).json({
            data: contacts,
            msj: "List of contacts"
        });
    } catch (err) {
        const custom = new ErrorHandler(500, 'Server error');
        handleError(custom, req, res);
    }
});

router.post("/", auth_token, postContactValidations, validator, async (req: Request, res: Response) => {
    const { name, email, phone, type } = req.body;
    try {
        let contact = await Contact.findOne({ phone });
        if (contact) {
            const custom = new ErrorHandler(400, 'There is a contact with that phone');
            handleError(custom, req, res);
            return;
        }
        contact = await Contact.findOne({ email });
        if (contact) {
            const custom = new ErrorHandler(400, 'There is a contact with that email');
            handleError(custom, req, res);
            return;
        }
        contact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user?.id
        });

        await contact.save();

        res.status(201).json({
            data: { contact },
            msj: 'Contact created'
        });
    } catch (err) {
        console.log(err);
        const custom = new ErrorHandler(500, 'Server error');
        handleError(custom, req, res);
    }
});

router.put("/", auth_token, putContactValidations, validator, async (req: Request, res: Response) => {
    const { name, email, phone, type } = req.body;
    try {
        let contact = await Contact.findById(req.query.id);
        if (!contact) {
            const custom = new ErrorHandler(404, 'The contact does not exist');
            handleError(custom, req, res);
            return;
        }

        if (contact.user.toString() !== req.user?.id) {
            const custom = new ErrorHandler(403, 'Forbidden');
            handleError(custom, req, res);
            return;
        }

        const contactFields: any = {};
        if (name) contactFields.name = name;
        if (email) contactFields.email = email;
        if (phone) contactFields.phone = phone;
        if (type) contactFields.type = type;

        contact = await Contact.findByIdAndUpdate(req.query.id, {$set: contactFields}, {new: true});

        res.status(200).json({
            data: { contact },
            msj: 'Contact updated'
        });
    } catch (err) {
        console.log(err);
        const custom = new ErrorHandler(500, 'Server error');
        handleError(custom, req, res);
    }
});

router.delete("/:id", auth_token, async (req: Request, res: Response) => {
    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) {
            const custom = new ErrorHandler(404, 'The contact does not exist');
            handleError(custom, req, res);
            return;
        }

        if (contact.user.toString() !== req.user?.id) {
            const custom = new ErrorHandler(403, 'Forbidden');
            handleError(custom, req, res);
            return;
        }
        await contact.deleteOne();
        return res.status(200).json({
            data: contact,
            msj: 'Contact deleted'
        });
    } catch (err) {
        console.log(err);
        const custom = new ErrorHandler(500, 'Server error');
        handleError(custom, req, res);
    }
});

export default router;