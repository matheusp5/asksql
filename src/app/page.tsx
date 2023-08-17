'use client'
import {FaTrash} from "react-icons/fa"
import {BsStars} from "react-icons/bs"
import Editor from 'react-simple-code-editor';
import {highlight, languages} from 'prismjs/components/prism-core';

import 'prismjs/themes/prism-dark.css'
import 'prismjs/components/prism-sql'
import {useState} from "react";
import axios from "axios";

export default function Home() {
    const [schema, setSchema] = useState<string>("")
    const [question, setQuestion] = useState<string>("")
    const [response, setResponse] = useState<string>("")

    const handleSubmitForm = async () => {
        const {data} = await axios.post("/api/chat", {
            schema, question
        })
        setResponse(data.result.choices[0].message.content)
    }
    
    const handleClearForm = () => {
        setSchema("")
        setQuestion("")
        setResponse("")
    }

    return (
        <div className="m-12">
            <header className="flex items-center justify-between">
                <h1 className="text-[#2DFF0B] text-2xl">
                    askSQL
                </h1>
                <FaTrash onClick={handleClearForm} className="text-[#D7DAE2] text-xl cursor-pointer"/>
            </header>
            <div className="mt-8">

                <div>
                    <h2 className="mb-4 text-white">Cole seu código SQL aqui</h2>
                    <Editor
                        onValueChange={setSchema}
                        highlight={code => highlight(code, languages.sql)}
                        value={schema}
                        className="bg-blue-950 text-white rounded-xl focus:border-emerald-600 transition-all border border-blue-950 max-w-40"
                        padding={12}
                        style={{
                            fontFamily: '"Fira code", "Fira Mono", monospace',
                            fontSize: 14,
                        }}
                    />
                </div>

                <div className="mt-8">
                    <h2 className="mb-2 text-white">Faça uma pergunta sobre seu código</h2>
                    <input value={question} onChange={(e) => setQuestion(e.target.value)} type="text"
                           className="w-full bg-blue-950 rounded-xl p-3 transition-all border border-blue-950 text-white focus:border-emerald-600 outline-none"/>
                </div>

                <button onClick={() => handleSubmitForm()}
                        className="text-white flex items-center w-full py-2 justify-center gap-2 mt-8 border border-white rounded-xl">
                    <BsStars/> Perguntar a IA
                </button>

                {response.length > 0 &&

                    <div className="mt-10">
                        <h2 className="mb-4 text-white">Resultado: </h2>
                        <Editor
                            readOnly
                            highlight={code => highlight(response, languages.sql)}
                            value={response}
                            className="bg-blue-950 text-white rounded-xl focus:border-emerald-600 transition-all border border-blue-950 max-w-40"
                            padding={12}
                            style={{
                                fontFamily: '"Fira code", "Fira Mono", monospace',
                                fontSize: 14,
                            }}
                        />
                    </div>

                }

            </div>
        </div>
    )
}
