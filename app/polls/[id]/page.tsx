'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { use } from 'react'
import { ArrowLeft, BarChart3, Clock, Users, Check, Share2, Loader2, AlertCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { pollService } from '@/services/poll-service'

// Import Poll type from service instead of redefining
import { Poll, PollOption } from '@/services/poll-service'

// Local Option type for backward compatibility
type Option = PollOption

// No need for mock data as we're using the poll service

export default function PollPage({ params }: { params: { id: string } }) {
  // Unwrap params using React.use()
  const unwrappedParams = use(params)
  const pollId = unwrappedParams.id
  
  const router = useRouter()
  const { toast } = useToast()
  const [poll, setPoll] = useState<Poll | null>(null)
  const [selectedOption, setSelectedOption] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [isVoting, setIsVoting] = useState(false)
  const [hasVoted, setHasVoted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const data = await pollService.getPollById(pollId)
        if (data) {
          setPoll(data)
          toast({
            title: "Poll loaded",
            description: "Successfully loaded poll details",
          })
        } else {
          setError('Poll not found')
          toast({
            title: "Error",
            description: "Poll not found",
            variant: "destructive",
          })
        }
      } catch (err) {
        console.error('Failed to fetch poll:', err)
        setError('Failed to load poll. Please try again later.')
        toast({
          title: "Error",
          description: "Failed to load poll",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchPoll()
  }, [pollId, toast]) // Using unwrapped pollId instead of params

  const handleVote = async () => {
    if (!selectedOption) {
      toast({
        title: "Error",
        description: "Please select an option to vote",
        variant: "destructive",
      })
      return
    }
    
    setIsVoting(true)
    
    try {
      // Submit vote using the poll service
      const updatedPoll = await pollService.votePoll(pollId, selectedOption)
      
      if (updatedPoll) {
        setPoll(updatedPoll)
        setHasVoted(true)
        
        toast({
          title: "Success",
          description: "Your vote has been recorded",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to record your vote",
          variant: "destructive",
        })
      }
    } catch (err) {
      console.error('Failed to submit vote:', err)
      toast({
        title: "Error",
        description: "Failed to submit your vote. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsVoting(false)
    }
  }
  
  const handleShare = () => {
    // In a real app, this would copy the current URL to clipboard
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        toast({
          title: "Link copied",
          description: "Poll link copied to clipboard",
        })
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Failed to copy link",
          variant: "destructive",
        })
      })
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            <p className="text-muted-foreground animate-pulse">Loading poll...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!poll) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <div className="max-w-md mx-auto bg-muted/30 p-8 rounded-lg border-2 border-dashed border-muted-foreground/20">
          <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <BarChart3 className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Poll not found</h2>
          <p className="mb-6 text-muted-foreground">The poll you're looking for doesn't exist or has been removed.</p>
          <Button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            onClick={() => router.push('/polls')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Polls
          </Button>
        </div>
      </div>
    )
  }

  // Calculate percentage for each option
  const getPercentage = (votes: number) => {
    if (!poll || poll.votesCount === 0) return 0
    return Math.round((votes / poll.votesCount) * 100)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Button 
        variant="outline" 
        className="mb-6 group hover:border-primary/50 transition-all duration-300" 
        onClick={() => router.push('/polls')}
      >
        <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
        Back to Polls
      </Button>
      
      <Card className="border-2 shadow-lg max-w-3xl mx-auto overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 h-3"></div>
        <CardHeader className="border-b bg-muted/30">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent inline-block">{poll.title}</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-2">
                <Clock className="h-4 w-4" />
                Created on {new Date(poll.createdAt).toLocaleDateString()}
                <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                  <Users className="h-3 w-3" />
                  {poll.votesCount} votes
                </span>
              </CardDescription>
            </div>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast({
                title: "Link copied",
                description: "Poll link copied to clipboard",
              });
            }}>
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="mb-8 text-lg">{poll.description}</p>
          
          <div className="space-y-6">
            {poll.options.map((option) => {
              const percentage = getPercentage(option.votes);
              const isSelected = selectedOption === option.id;
              const isLeading = poll.options.every(o => o.votes <= option.votes) && option.votes > 0;
              
              return (
                <div key={option.id} className={`space-y-2 p-4 rounded-lg transition-all duration-300 ${isSelected ? 'bg-primary/5 border border-primary/20' : 'hover:bg-muted/50'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <label className="flex items-center cursor-pointer">
                        {!hasVoted ? (
                          <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${isSelected ? 'border-primary bg-primary/10' : 'border-muted-foreground'}`}>
                            {isSelected && <div className="w-2 h-2 rounded-full bg-primary"></div>}
                          </div>
                        ) : (
                          <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${selectedOption === option.id ? 'bg-primary text-white' : 'bg-muted'}`}>
                            {selectedOption === option.id && <Check className="h-3 w-3" />}
                          </div>
                        )}
                        <span className={`font-medium ${isSelected ? 'text-primary' : ''}`}>{option.text}</span>
                        {isLeading && !isVoting && (
                          <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Leading</span>
                        )}
                      </label>
                    </div>
                    <div className="w-16 text-right font-bold">
                      {percentage}%
                    </div>
                  </div>
                  
                  <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-3 rounded-full transition-all duration-1000 ease-out ${isSelected ? 'bg-primary' : 'bg-primary/60'}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground flex justify-between">
                    <span>{option.votes} votes</span>
                    {!hasVoted && (
                      <button 
                        className="text-primary hover:underline" 
                        onClick={() => setSelectedOption(option.id)}
                        disabled={isVoting}
                      >
                        Select
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
        
        <CardFooter className="border-t p-6 flex flex-col gap-4">
          {!hasVoted ? (
            <Button 
              onClick={handleVote} 
              disabled={!selectedOption || isVoting}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 h-12"
            >
              {isVoting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting vote...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Submit Vote
                </>
              )}
            </Button>
          ) : (
            <div className="bg-primary/10 text-primary rounded-lg p-4 text-center">
              <Check className="inline-block mr-2 h-4 w-4" />
              Thank you for voting! Your response has been recorded.
            </div>
          )}
          
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>Total votes: {poll.votesCount}</span>
            <Button variant="link" size="sm" className="text-xs p-0 h-auto" onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast({
                title: "Link copied",
                description: "Poll link copied to clipboard",
              });
            }}>
              Share Poll
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}