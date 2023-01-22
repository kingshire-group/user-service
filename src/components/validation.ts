import Joi from 'joi';
import { Types } from 'mongoose';

abstract class Validation {
    customJoi: any;
    readonly messageObjectId: string = 'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters';

    constructor() {
        this.customJoi = Joi.extend((joi) => ({
            type: 'objectId',
            base: joi.string(),
            validate(
                value: any,
                helpers: Joi.CustomHelpers,
            ): Object | string {
                if (!Types.ObjectId.isValid(value)) {
                    return 'Error'
                }

                return value; // Keep the value as it was
            },
        }));
    }
}

export default Validation;
