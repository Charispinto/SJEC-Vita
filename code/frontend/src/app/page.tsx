"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PlusIcon, RefreshCcwIcon, BarChartIcon, LayersIcon, HelpCircleIcon, ActivityIcon, SettingsIcon, MicIcon, SendIcon, AwardIcon } from 'lucide-react'
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

export default function Home() {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([])
  const [input, setInput] = useState('')
  const [showGreeting, setShowGreeting] = useState(true)


  const mockData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 200 },
    { name: 'Apr', value: 278 },
    { name: 'May', value: 189 },
    { name: 'Jun', value: 239 },
    { name: 'Jul', value: 349 },
  ]

  const handleSendMessage = async () => {
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }])
      setInput('')
      setShowGreeting(false)
      //change endpoint to chat 
      const response = await axios.post('http://localhost:8000/bar_chart', {text : `${input}`})
      // Simulate AI response
      
      let assistantContent = response.data.gemini_response

      if (assistantContent.toLowerCase().startsWith('bar graph')) {
        assistantContent = (
          <Card className="w-full max-w-3xl">
            <CardHeader>
              <CardTitle>Wells Frago Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  value: {
                    label: "Value",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="value" fill="var(--color-value)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        )
      }

      setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: assistantContent }])
    }
  }



  return (
    <>
      <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4">
          <div className='flex w-full items-center'>
          <img src='well.png' width={90}  height={50} className=' ml-5 mb-4'/>
          </div>    
          <h2 className="text-lg font-semibold mb-4">AI Assistant</h2>
          <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black mb-6">
            New chat <PlusIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="flex-grow px-4">
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">Recent</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-700 hover:text-yellow-600">New chat</a></li>
              <li><a href="#" className="text-gray-700 hover:text-yellow-600">New chat</a></li>
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">Tools</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-700 hover:text-yellow-600 flex items-center"><RefreshCcwIcon className="mr-2 h-4 w-4" /> <button>AI Assistant</button></a></li>
            </ul>
          </div>
        </ScrollArea>
        <div className="p-4 border-t border-gray-200">
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-700 hover:text-yellow-600 flex items-center"><HelpCircleIcon className="mr-2 h-4 w-4" /> Help</a></li>
            <li><a href="#" className="text-gray-700 hover:text-yellow-600 flex items-center"><ActivityIcon className="mr-2 h-4 w-4" /> Activity</a></li>
            <li><a href="#" className="text-gray-700 hover:text-yellow-600 flex items-center"><SettingsIcon className="mr-2 h-4 w-4" /> Settings</a></li>
          </ul>
        </div>
        <div className="p-4 border-t border-gray-200">
          {/* <img src="/placeholder.svg?height=20&width=60" alt="Niveus Logo" /> */}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-8 overflow-auto">
          {showGreeting ? (
            <>
              <h1 className="text-6xl font-bold text-yellow-700 mb-4">AI Assistant</h1>
              <p className="text-4xl font-semibold mb-2">Hello.</p>
              <p className="text-2xl text-gray-500 mb-6">How can I help you today?</p>
              <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-8">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-orange-700">
                      Warning: Always verify the generated response.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <ScrollArea className="h-full container mx-[15vh] mt-[10vh]">
              {messages.map((message, index) => (
                <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-left' : 'text-left'}`}>
                  <div className={`inline-block p-3 rounded-lg max-w-2xl ${message.role === 'user' ? 'bg-yellow-100 text-black' : 'bg-white text-black border border-gray-200'}`}>
                    {/* here is the message part  all graphs and all to be added here*/}
                    <div>{message.content}</div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          )}
        </main>
        <footer className="bg-white border-t border-gray-200 p-4">
          <div className="max-w-4xl mx-auto flex items-center bg-white rounded-full border border-gray-300 px-4">
            <select className="text-sm text-gray-500 bg-transparent border-none focus:ring-0 pr-2" defaultValue="English">
              <option>English</option>
              <option>Malay</option>
              <option>Chinese</option>
            </select>
            <Input
              type="text"
              placeholder="Enter a prompt here"
              className="flex-1 border-none focus:ring-0 text-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage()
                }
              }}
            />
            <Button size="icon" variant="ghost" className="text-gray-400">
              <MicIcon className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost" className="text-gray-400" onClick={handleSendMessage}>
              <SendIcon className="h-5 w-5" />
            </Button>
          </div>
        </footer>
      </div>
    </div>
    </>
  );
}
