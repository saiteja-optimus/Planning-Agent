import OpenAI from 'openai'

export const nimClient = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: 'https://integrate.api.nvidia.com/v1',
})

export const NIM_MODEL = 'meta/llama-3.1-70b-instruct'
