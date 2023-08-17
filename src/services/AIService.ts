import {Configuration, OpenAIApi} from "openai-edge";


class AIService {
    private readonly api_key: string = "YOUR_API_KEY"
    private readonly org_key: string = "YOUR_ORG_ID"
    private readonly configuration: Configuration = new Configuration({
        organization: this.org_key,
        apiKey: this.api_key
    })
    private openai: OpenAIApi;
    
    constructor() {
        this.openai = new OpenAIApi(this.configuration);
    }
    
    async GetResult(schema: string, question: string) {
        const message = `
            Segue abaixo um schema de um banco de dados SQL e uma pergunta, você vai analisar o schema SQL e com base nele, você vai gerar uma query para responder a pergunta.
 
            Schema SQL: 
            """
            ${schema}
            """
            
            Pergunta: ${question}.
            
            Com base nessa pergunta, gere uma query SQL.
            Para a resposta, retorne apenas a query SQL, nada mais além disso! 
        `.trim()
        const completion = await (await this.openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: "user", content: message
                }
            ],
            max_tokens: 1000
        })).json()
        console.log(completion)
        return completion
    }
    
}

export default AIService
