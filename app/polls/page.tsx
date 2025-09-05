/**
 * @fileoverview Polls page component that displays a list of all available polls.
 * This page allows users to view, create, and interact with polls.
 */

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { PlusCircle, BarChart3, Clock, Users, AlertCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { Poll, pollService } from '@/services/poll-service'

/**
 * Main polls page component that displays all available polls.
 * Handles loading polls, error states, and notifications.
 */
export default function PollsPage() {
  // State for storing polls data, loading state, and potential errors
  const [polls, setPolls] = useState<Poll[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  /**
   * Effect hook to fetch polls when the component mounts.
   * Handles success and error states with appropriate toast notifications.
   */
  useEffect(() => {
    const fetchPolls = async () => {
      try {
        // Fetch polls from the poll service
        const data = await pollService.getPolls()
        setPolls(data)
        
        // Show success notification
        toast({
          title: "Polls loaded",
          description: "Successfully loaded all available polls",
        })
      } catch (err) {
        // Handle and log errors
        console.error('Failed to fetch polls:', err)
        setError('Failed to load polls. Please try again later.')
        
        // Show error notification
        toast({
          title: "Error",
          description: "Failed to load polls",
          variant: "destructive",
        })
      } finally {
        // Update loading state regardless of outcome
        setIsLoading(false)
      }
    }

    fetchPolls()
  }, [toast])

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent inline-block">Polls</h1>
          <p className="text-muted-foreground mt-1">Discover and vote on community polls</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl" asChild>
          <Link href="/polls/create" className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Create New Poll
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="h-full opacity-70">
              <CardHeader>
                <div className="h-7 bg-gray-200 rounded-md w-3/4 animate-pulse"></div>
                <div className="h-5 bg-gray-200 rounded-md w-1/2 animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-gray-200 rounded-md w-full animate-pulse mb-2"></div>
                <div className="h-4 bg-gray-200 rounded-md w-5/6 animate-pulse"></div>
              </CardContent>
              <CardFooter>
                <div className="h-4 bg-gray-200 rounded-md w-1/4 animate-pulse"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12 border-2 border-dashed border-destructive/20 rounded-lg bg-destructive/5">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <h3 className="text-xl font-medium mb-2">Error Loading Polls</h3>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button variant="outline" className="mr-2" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      ) : polls.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-medium mb-2">No polls found</h3>
          <p className="text-muted-foreground mb-6">Get started by creating your first poll</p>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300" asChild>
            <Link href="/polls/create" className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Create New Poll
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {polls.map((poll) => (
            <Link key={poll.id} href={`/polls/${poll.id}`} className="block group">
              <Card className="h-full border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors">{poll.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    Created on {new Date(poll.createdAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{poll.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Users className="h-4 w-4 text-primary" />
                    <span>{poll.votesCount} votes</span>
                  </div>
                  <div className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                    {poll.isActive ? 'Active' : 'Closed'}
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}