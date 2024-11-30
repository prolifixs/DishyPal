import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FaGoogle, FaFacebook } from "react-icons/fa"

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome to DishyPal</h1>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" />
              </div>
              <Button className="w-full">Log In</Button>
            </form>
          </TabsContent>
          <TabsContent value="register">
            <form className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Create a password" />
              </div>
              <Button className="w-full">Sign Up</Button>
            </form>
          </TabsContent>
        </Tabs>
        <div className="mt-4">
          <Button variant="outline" className="w-full mb-2">
            <FaGoogle className="mr-2" />
            Continue with Google
          </Button>
          <Button variant="outline" className="w-full">
            <FaFacebook className="mr-2" />
            Continue with Facebook
          </Button>
        </div>
        <div className="text-center mt-4">
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  )
}

