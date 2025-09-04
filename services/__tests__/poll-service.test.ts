import { pollService, Poll, PollOption, CreatePollData } from '../poll-service';

// Mock the global setTimeout to avoid waiting in tests
jest.useFakeTimers({ advanceTimers: true });

// Helper function to resolve promises after advancing timers
async function advanceTimersAndAwait<T>(promise: Promise<T>): Promise<T> {
  jest.runAllTimers();
  return await promise;
}

describe('Poll Service', () => {
  // Test getPolls function
  describe('getPolls', () => {
    it('should return an array of polls', async () => {
      // Call the function and advance timers
      const polls = await advanceTimersAndAwait(pollService.getPolls());
      
      // Assertions
      expect(Array.isArray(polls)).toBe(true);
      expect(polls.length).toBeGreaterThan(0);
      expect(polls[0]).toHaveProperty('id');
      expect(polls[0]).toHaveProperty('title');
      expect(polls[0]).toHaveProperty('options');
    });
  });

  // Test getPollById function
  describe('getPollById', () => {
    it('should return a poll when given a valid ID', async () => {
      // Call the function with a known ID (from mock data) and advance timers
      const poll = await advanceTimersAndAwait(pollService.getPollById('1'));
      
      // Assertions
      expect(poll).not.toBeNull();
      expect(poll?.id).toBe('1');
      expect(poll?.title).toBe('Favorite Programming Language');
    });

    it('should return null when given an invalid ID', async () => {
      // Call the function with an invalid ID and advance timers
      const poll = await advanceTimersAndAwait(pollService.getPollById('non-existent-id'));
      
      // Assertions
      expect(poll).toBeNull();
    });
  });

  // Test createPoll function
  describe('createPoll', () => {
    it('should create a new poll with the provided data', async () => {
      // Create test data
      const pollData: CreatePollData = {
        title: 'Test Poll',
        description: 'This is a test poll',
        options: ['Option 1', 'Option 2', 'Option 3']
      };
      
      // Call the function and advance timers
      const newPoll = await advanceTimersAndAwait(pollService.createPoll(pollData, 'test@example.com'));
      
      // Assertions
      expect(newPoll).toHaveProperty('id');
      expect(newPoll.title).toBe(pollData.title);
      expect(newPoll.description).toBe(pollData.description);
      expect(newPoll.options.length).toBe(pollData.options.length);
      expect(newPoll.createdBy).toBe('test@example.com');
      expect(newPoll.votesCount).toBe(0);
      expect(newPoll.isActive).toBe(true);
      
      // Verify the poll was added to the polls array
      const allPolls = await advanceTimersAndAwait(pollService.getPolls());
      const foundPoll = allPolls.find(p => p.id === newPoll.id);
      expect(foundPoll).not.toBeUndefined();
    });
  });

  // Test votePoll function
  describe('votePoll', () => {
    it('should increment the vote count for the selected option', async () => {
      // Get a poll to vote on
      const polls = await advanceTimersAndAwait(pollService.getPolls());
      const testPoll = polls[0];
      const optionToVoteFor = testPoll.options[0];
      
      // Record initial votes
      const initialVotes = optionToVoteFor.votes;
      const initialTotalVotes = testPoll.votesCount;
      
      // Vote on the poll and advance timers
      const updatedPoll = await advanceTimersAndAwait(pollService.votePoll(testPoll.id, optionToVoteFor.id));
      
      // Assertions
      expect(updatedPoll).not.toBeNull();
      const updatedOption = updatedPoll!.options.find(o => o.id === optionToVoteFor.id);
      expect(updatedOption?.votes).toBe(initialVotes + 1);
      expect(updatedPoll!.votesCount).toBe(initialTotalVotes + 1);
    });

    it('should return null when given an invalid poll ID', async () => {
      // Call the function with an invalid poll ID and advance timers
      const result = await advanceTimersAndAwait(pollService.votePoll('non-existent-id', 'some-option-id'));
      
      // Assertions
      expect(result).toBeNull();
    });

    it('should return null when given an invalid option ID', async () => {
      // Get a valid poll ID
      const polls = await advanceTimersAndAwait(pollService.getPolls());
      const testPoll = polls[0];
      
      // Call the function with a valid poll ID but invalid option ID and advance timers
      const result = await advanceTimersAndAwait(pollService.votePoll(testPoll.id, 'non-existent-option-id'));
      
      // Assertions
      expect(result).toBeNull();
    });
  });

  // Test deletePoll function
  describe('deletePoll', () => {
    it('should delete a poll when given a valid ID', async () => {
      // Get a poll to delete
      const polls = await advanceTimersAndAwait(pollService.getPolls());
      const pollToDelete = polls[polls.length - 1]; // Use the last poll to avoid affecting other tests
      
      // Delete the poll and advance timers
      const result = await advanceTimersAndAwait(pollService.deletePoll(pollToDelete.id));
      
      // Assertions
      expect(result).toBe(true);
      
      // Verify the poll was removed
      const updatedPolls = await advanceTimersAndAwait(pollService.getPolls());
      const foundPoll = updatedPolls.find(p => p.id === pollToDelete.id);
      expect(foundPoll).toBeUndefined();
    });

    it('should return false when given an invalid ID', async () => {
      // Call the function with an invalid ID and advance timers
      const result = await advanceTimersAndAwait(pollService.deletePoll('non-existent-id'));
      
      // Assertions
      expect(result).toBe(false);
    });
  });
});