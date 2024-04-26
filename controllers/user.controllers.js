import { User } from "../models/user.models.js";
import { errorHandler } from "../utils/error.handler.js";
import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"

export const userRegister = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const isUserExist = await User.findOne({ email });
        if (isUserExist) return next(errorHandler(400, "User already exists"));

        const hashPassword = bcryptjs.hashSync(password, 10);

        await User.create({
            name, email, password: hashPassword
        });

        res.status(202).json({
            message: "User register successfuly"
        })
    } catch (error) {
        next(error);
    }
}

export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const isUserExist = await User.findOne({ email });
        if (!isUserExist) return next(errorHandler(404, "User is not exist"));

        const validPassword = bcryptjs.compareSync(password, isUserExist.password);

        if (!validPassword) return next(errorHandler(400, "Incorect username or password"));

        const token = jwt.sign({ _id: isUserExist._id }, process.env.JWT_SECREATE_KEY);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        }).status(200).json({
            message: "User login succesfuly"
        })
    } catch (error) {
        next(error);
    }
}

export const userProfile = (req, res, next) => {

    try {
        const { user } = req;
        const { password, ...rest } = user._doc;
        res.status(200).json(rest)
    } catch (error) {
        next(error);
    }
}

export const logoutUser = (req, res, next) => {
    try {
        res.clearCookie("token").status(200).json({
            messgae: "User logout successfully"
        });
    } catch (error) {
        next(error);
    }
}

export const userUpdate = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(400, "You can only update your account"));
    }

    try {
        if (req.body.email) {
            const userExist = await User.findOne({ email: req.body.email });
            if (userExist) return next(errorHandler(400, "Email already exist "));
        }

        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const { id } = req.params;

        const updatedUser = await User.findByIdAndUpdate(id, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }
        }, {
            new: true
        });

        const { password, ...rest } = updatedUser._doc;
        res.status(202).json({
            message: "Update user successfuly",
            rest
        })
    } catch (error) {
        next(error);
    }
}

export const deletedUser = async (req, res, next) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.clearCookie("token").status(200).json({ message: "User deleted successfuly" })
} 