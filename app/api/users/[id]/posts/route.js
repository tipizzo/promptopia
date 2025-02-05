import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt';
import mongoose from "mongoose";

export const GET = async (request, {params}) => {
    try {
        await connectToDB()

        // Await the params object
        const {id} = params;

        const prompts = await Prompt.find({
            creator: params.id
        }).populate('creator'); // The populate is used to get the creator's data

        return new Response(JSON.stringify(prompts), {
            status: 200
        })
    } catch (error) {
        return new Response("Failed to fetch all prompts", {
            status: 500
        })
    }
}