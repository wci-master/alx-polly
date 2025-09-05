/**
 * @fileoverview Poll service module that provides functionality for managing polls
 * including creating, retrieving, voting, and deleting polls.
 */

/**
 * Represents a single option within a poll.
 * @typedef {Object} PollOption
 * @property {string} id - Unique identifier for the option
 * @property {string} text - The text content of the option
 * @property {number} votes - Number of votes this option has received
 */
export type PollOption = {
  id: string
  text: string
  votes: number
}

/**
 * Represents a complete poll with all its data.
 * @typedef {Object} Poll
 * @property {string} id - Unique identifier for the poll
 * @property {string} title - The title of the poll
 * @property {string} description - Detailed description of the poll
 * @property {PollOption[]} options - Array of available options for voting
 * @property {string} createdAt - ISO timestamp when the poll was created
 * @property {string} [createdBy] - Optional identifier of the user who created the poll
 * @property {number} votesCount - Total number of votes across all options
 * @property {boolean} isActive - Whether the poll is currently active
 */
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

/**
 * Data required to create a new poll.
 * @typedef {Object} CreatePollData
 * @property {string} title - The title for the new poll
 * @property {string} description - Detailed description of the new poll
 * @property {string[]} options - Array of option texts for the poll
 */
export type CreatePollData = {
  title: string
  description: string
  options: string[]
}

/**
 * Mock data for polls used for development and testing purposes.
 * These represent example polls with realistic data structures.
 */
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

/**
 * In-memory storage for polls (simulating a database).
 * In a production environment, this would be replaced with a real database.
 */
let polls = [...mockPolls]

/**
 * Generates a unique ID for polls and options.
 * Uses a combination of random strings to ensure uniqueness.
 * 
 * @returns {string} A unique identifier string
 */
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

/**
 * Poll service object that provides methods for managing polls.
 * This service handles all poll-related operations including retrieval,
 * creation, voting, and deletion of polls.
 */
export const pollService = {
  /**
   * Retrieves all available polls.
   * 
   * @returns {Promise<Poll[]>} A promise that resolves to an array of all polls
   */
  getPolls: async (): Promise<Poll[]> => {
    // Simulate API delay to mimic real-world network latency
    await new Promise(resolve => setTimeout(resolve, 800))
    return polls
  },

  /**
   * Retrieves a specific poll by its unique identifier.
   * 
   * @param {string} id - The unique identifier of the poll to retrieve
   * @returns {Promise<Poll | null>} A promise that resolves to the found poll or null if not found
   */
  getPollById: async (id: string): Promise<Poll | null> => {
    // Simulate API delay to mimic real-world network latency
    await new Promise(resolve => setTimeout(resolve, 500))
    const poll = polls.find(p => p.id === id)
    return poll || null
  },

  /**
   * Creates a new poll with the provided data.
   * 
   * @param {CreatePollData} data - The data for creating the new poll
   * @param {string} [userId] - Optional identifier of the user creating the poll
   * @returns {Promise<Poll>} A promise that resolves to the newly created poll
   */
  createPoll: async (data: CreatePollData, userId?: string): Promise<Poll> => {
    // Simulate API delay to mimic real-world network latency
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

  /**
   * Records a vote for a specific option in a poll.
   * Increments the vote count for the selected option and updates the total vote count.
   * 
   * @param {string} pollId - The unique identifier of the poll to vote on
   * @param {string} optionId - The unique identifier of the option being voted for
   * @returns {Promise<Poll | null>} A promise that resolves to the updated poll or null if poll/option not found
   */
  votePoll: async (pollId: string, optionId: string): Promise<Poll | null> => {
    // Simulate API delay to mimic real-world network latency
    await new Promise(resolve => setTimeout(resolve, 700))
    
    // Find the poll by ID
    const pollIndex = polls.findIndex(p => p.id === pollId)
    if (pollIndex === -1) return null // Poll not found
    
    // Create a copy of the poll to avoid direct state mutation
    const poll = { ...polls[pollIndex] }
    
    // Find the option by ID
    const optionIndex = poll.options.findIndex(o => o.id === optionId)
    if (optionIndex === -1) return null // Option not found
    
    // Update the votes for the selected option (immutably)
    poll.options = [...poll.options]
    poll.options[optionIndex] = {
      ...poll.options[optionIndex],
      votes: poll.options[optionIndex].votes + 1
    }
    
    // Update total votes count for the poll
    poll.votesCount += 1
    
    // Update the poll in the array
    polls[pollIndex] = poll
    
    return poll
  },

  /**
   * Deletes a poll by its unique identifier.
   * 
   * @param {string} id - The unique identifier of the poll to delete
   * @returns {Promise<boolean>} A promise that resolves to true if deletion was successful, false otherwise
   */
  deletePoll: async (id: string): Promise<boolean> => {
    // Simulate API delay to mimic real-world network latency
    await new Promise(resolve => setTimeout(resolve, 600))
    
    // Store initial length to determine if a poll was removed
    const initialLength = polls.length
    
    // Filter out the poll with the matching ID
    polls = polls.filter(p => p.id !== id)
    
    // Return true if a poll was removed, false otherwise
    return polls.length < initialLength
  }
}