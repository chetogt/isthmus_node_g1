import {query} from "express-validator";

const validations = [
    query("id").exists().withMessage("Missing contact id")
];

export default validations;