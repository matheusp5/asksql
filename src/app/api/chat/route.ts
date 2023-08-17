import {NextResponse} from "next/server";
import AIService from "@/services/AIService";



export async function POST(req: Request) {
    const aiService: AIService = new AIService()
    const {question, schema} = await req.json()
    
    const response = await aiService.GetResult(schema, question)
    
    return NextResponse.json({
        result: response
    })
}