'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Plus, X, HelpCircle, Check, Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { pollService } from '@/services/poll-service'
import { useAuth } from '@/contexts/auth-context'

export default function CreatePollPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [options, setOptions] = useState(['', ''])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const addOption = () => {
    setOptions([...options, ''])
  }

  const removeOption = (index: number) => {
    if (options.length <= 2) return
    const newOptions = [...options]
    newOptions.splice(index, 1)
    setOptions(newOptions)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a poll title",
        variant: "destructive",
      })
      return
    }
    
    if (!description.trim()) {
      toast({
        title: "Error",
        description: "Please enter a poll description",
        variant: "destructive",
      })
      return
    }
    
    const validOptions = options.filter(opt => opt.trim())
    if (validOptions.length < 2) {
      toast({
        title: "Error",
        description: "Please provide at least two poll options",
        variant: "destructive",
      })
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Create poll using the poll service
      await pollService.createPoll(
        {
          title: title.trim(),
          description: description.trim(),
          options: validOptions
        },
        user?.email
      )
      
      toast({
        title: "Success",
        description: "Your poll has been created successfully!",
      })
      
      // Redirect to polls page after successful creation
      router.push('/polls')
    } catch (error) {
      console.error('Failed to create poll:', error)
      toast({
        title: "Error",
        description: "Failed to create poll. Please try again.",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Button 
        variant="outline" 
        className="mb-6 group hover:border-primary/50 transition-all duration-300" 
        onClick={() => router.push('/polls')}
      >
        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
        Back to Polls
      </Button>
      
      <Card className="border-2 shadow-lg max-w-2xl mx-auto">
        <CardHeader className="border-b bg-muted/50">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <HelpCircle className="h-4 w-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">Create a New Poll</CardTitle>
              <CardDescription>
                Fill out the form below to create a new poll and gather opinions
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium flex items-center gap-1">
                Poll Title <span className="text-red-500">*</span>
              </label>
              <Input
                id="title"
                placeholder="Enter a question for your poll"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="border-2 focus:border-primary/50 transition-all duration-300"
              />
              <p className="text-xs text-muted-foreground">Make your question clear and specific</p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium flex items-center gap-1">
                Description <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="description"
                placeholder="Provide more context for your poll"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[100px] border-2 focus:border-primary/50 transition-all duration-300"
                required
              />
              <p className="text-xs text-muted-foreground">Give participants the context they need to make an informed choice</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium flex items-center gap-1">
                  Options <span className="text-red-500">*</span>
                </label>
                <span className="text-xs text-muted-foreground">Minimum 2 options required</span>
              </div>
              
              <div className="space-y-3 bg-muted/30 p-4 rounded-md border">
                {options.map((option, index) => (
                  <div key={index} className="flex gap-2 items-center group">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                      {index + 1}
                    </div>
                    <Input
                      placeholder={`Option ${index + 1}`}
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      required
                      className="border-2 focus:border-primary/50 transition-all duration-300 flex-1"
                    />
                    {options.length > 2 && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon"
                        onClick={() => removeOption(index)}
                        className="text-muted-foreground hover:text-red-500 hover:border-red-500 transition-colors duration-300"
                      >
                        <X size={16} />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              
              <Button 
                type="button" 
                variant="outline" 
                onClick={addOption}
                className="w-full border-dashed border-2 hover:border-primary/50 transition-all duration-300"
              >
                <Plus size={16} className="mr-2" />
                Add Another Option
              </Button>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-4 border-t pt-6">
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg h-12"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin mr-2"></div>
                  Creating Poll...
                </>
              ) : (
                <>
                  <Check size={16} className="mr-2" />
                  Create Poll
                </>
              )}
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              By creating a poll, you agree to our Terms of Service and Privacy Policy
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}