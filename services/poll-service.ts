// Poll data types
export type PollOption = {
  id: string
  text: string
  votes: number
}

export type Poll = {
  id: string
  title: string
  description: string
  options: PollOption[]
  createdAt: string
  createdBy?: string
  votesCount: number
  isActive: boolean
}

export type CreatePollData = {
  title: string
  description: string
  options: string[]
}

// Mock data for polls
const mockPolls: Poll[] = [
  {
    id: '1',
    title: 'Favorite Programming Language',
    description: 'What is your favorite programming language to work with?',
    options: [
      { id: '1-1', text: 'JavaScript', votes: 64 },
      { id: '1-2', text: 'Python', votes: 52 },
      { id: '1-3', text: 'Java', votes: 12 },
      { id: '1-4', text: 'C#', votes: 17 },
    ],
    createdAt: '2023-05-15',
    createdBy: 'user1@example.com',
    votesCount: 145,
    isActive: true
  },
  {
    id: '2',
    title: 'Best Frontend Framework',
    description: 'Which frontend framework do you prefer for web development?',
    options: [
      { id: '2-1', text: 'React', votes: 45 },
      { id: '2-2', text: 'Vue', votes: 28 },
      { id: '2-3', text: 'Angular', votes: 16 },
    ],
    createdAt: '2023-05-20',
    createdBy: 'user2@example.com',
    votesCount: 89,
    isActive: true
  },
  {
    id: '3',
    title: 'Remote Work Preference',
    description: 'Do you prefer working remotely or in an office?',
    options: [
      { id: '3-1', text: 'Fully Remote', votes: 120 },
      { id: '3-2', text: 'Hybrid', votes: 65 },
      { id: '3-3', text: 'In Office', votes: 25 },
    ],
    createdAt: '2023-05-25',
    createdBy: 'user3@example.com',
    votesCount: 210,
    isActive: true
  },
]

// In-memory storage for polls (simulating a database)
let polls = [...mockPolls]

// Helper function to generate a unique ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// Poll service functions
export const pollService = {
  // Get all polls
  getPolls: async (): Promise<Poll[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))
    return polls
  },

  // Get a single poll by ID
  getPollById: async (id: string): Promise<Poll | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    const poll = polls.find(p => p.id === id)
    return poll || null
  },

  // Create a new poll
  createPoll: async (data: CreatePollData, userId?: string): Promise<Poll> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const newPoll: Poll = {
      id: generateId(),
      title: data.title,
      description: data.description,
      options: data.options.map(option => ({
        id: generateId(),
        text: option,
        votes: 0
      })),
      createdAt: new Date().toISOString(),
      createdBy: userId,
      votesCount: 0,
      isActive: true
    }
    
    polls = [newPoll, ...polls]
    return newPoll
  },

  // Vote on a poll
  votePoll: async (pollId: string, optionId: string): Promise<Poll | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 700))
    
    const pollIndex = polls.findIndex(p => p.id === pollId)
    if (pollIndex === -1) return null
    
    const poll = { ...polls[pollIndex] }
    const optionIndex = poll.options.findIndex(o => o.id === optionId)
    if (optionIndex === -1) return null
    
    // Update the votes
    poll.options = [...poll.options]
    poll.options[optionIndex] = {
      ...poll.options[optionIndex],
      votes: poll.options[optionIndex].votes + 1
    }
    
    // Update total votes count
    poll.votesCount += 1
    
    // Update the poll in the array
    polls[pollIndex] = poll
    
    return poll
  },

  // Delete a poll
  deletePoll: async (id: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600))
    
    const initialLength = polls.length
    polls = polls.filter(p => p.id !== id)
    
    return polls.length < initialLength
  }
}