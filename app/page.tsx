import Link from "next/link";
import Image from "next/image";
import { BarChart3, Vote, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <div className="max-w-3xl w-full text-center space-y-8">
        <div className="space-y-4">
          <div className="inline-block animate-bounce bg-primary/10 px-3 py-1 rounded-full text-sm font-medium text-primary mb-4">
            ✨ Introducing Polly
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Create and share polls <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">instantly</span>
          </h1>
        </div>
        
        <p className="text-xl text-muted-foreground">
          Polly makes it easy to create polls, gather opinions, and analyze results in real-time.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl" asChild>
            <Link href="/polls">Browse Polls</Link>
          </Button>
          <Button size="lg" variant="outline" className="border-2 hover:bg-muted/50 transition-all duration-300" asChild>
            <Link href="/polls/create">Create a Poll</Link>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full mt-16">
        <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
          <CardContent className="pt-6 flex flex-col items-center text-center p-6">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <Vote className="h-6 w-6 text-blue-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Easy to Create</h3>
              <p className="text-muted-foreground">Create polls in seconds with our intuitive interface</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
          <CardContent className="pt-6 flex flex-col items-center text-center p-6">
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Real-time Results</h3>
              <p className="text-muted-foreground">Watch votes come in and update instantly</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
          <CardContent className="pt-6 flex flex-col items-center text-center p-6">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Share2 className="h-6 w-6 text-green-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Share Anywhere</h3>
              <p className="text-muted-foreground">Easily share your polls on social media or via link</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-20 text-center">
        <p className="text-muted-foreground">Join thousands of users who trust Polly for their polling needs</p>
        <div className="flex justify-center gap-8 mt-6">
          <div className="opacity-50 hover:opacity-100 transition-opacity">
            <Image src="/globe.svg" alt="Company logo" width={100} height={40} />
          </div>
          <div className="opacity-50 hover:opacity-100 transition-opacity">
            <Image src="/file.svg" alt="Company logo" width={100} height={40} />
          </div>
          <div className="opacity-50 hover:opacity-100 transition-opacity">
            <Image src="/window.svg" alt="Company logo" width={100} height={40} />
          </div>
        </div>
      </div>
    </div>
  );
}
