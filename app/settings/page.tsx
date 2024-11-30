"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
  })

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <Tabs defaultValue="profile">
        <TabsList className="mb-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <form className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="John Doe" />
            </div>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="johndoe" />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" defaultValue="Food enthusiast and amateur chef." />
            </div>
            <Button>Save Changes</Button>
          </form>
        </TabsContent>
        <TabsContent value="account">
          <form className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john@example.com" />
            </div>
            <div>
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div>
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
            <Button>Update Account</Button>
          </form>
        </TabsContent>
        <TabsContent value="notifications">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications via email
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={notifications.email}
                onCheckedChange={(checked) =>
                  setNotifications((prev) => ({ ...prev, email: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive push notifications on your devices
                </p>
              </div>
              <Switch
                id="push-notifications"
                checked={notifications.push}
                onCheckedChange={(checked) =>
                  setNotifications((prev) => ({ ...prev, push: checked }))
                }
              />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="devices">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-bold">Connected Devices</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <div className="h-3 w-3 bg-primary rounded-full"></div>
                    </div>
                    <div>
                      <p className="font-medium">DishyBot</p>
                      <p className="text-sm text-muted-foreground">Connected • Last active 2h ago</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Disconnect</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-destructive/10 rounded-full flex items-center justify-center">
                      <div className="h-3 w-3 bg-destructive rounded-full"></div>
                    </div>
                    <div>
                      <p className="font-medium">Dishy Goggles</p>
                      <p className="text-sm text-muted-foreground">Disconnected • Last seen 5d ago</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <div className="h-3 w-3 bg-primary rounded-full"></div>
                    </div>
                    <div>
                      <p className="font-medium">Dishy Appliance</p>
                      <p className="text-sm text-muted-foreground">Connected • Last active 5m ago</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Disconnect</Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Connect your Dishy devices to sync your cooking preferences and recipes across all platforms.
              </p>
              <Button variant="secondary" size="sm">Add New Device</Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="subscription">
          <div className="space-y-6">
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold">Current Plan</h3>
                  <p className="text-sm text-muted-foreground">Pro Plan - $9.99/month</p>
                </div>
                <Button variant="outline">Change Plan</Button>
              </div>
              <div className="space-y-2">
                <p className="text-sm">Next billing date: July 1, 2024</p>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-full bg-secondary rounded-full">
                    <div className="h-2 w-3/4 bg-primary rounded-full"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">23 days left</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold">Plan Features</h3>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-primary rounded-full"></div>
                  <p className="text-sm">Unlimited recipe storage</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-primary rounded-full"></div>
                  <p className="text-sm">Advanced meal planning tools</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-primary rounded-full"></div>
                  <p className="text-sm">Priority customer support</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-primary rounded-full"></div>
                  <p className="text-sm">AI-powered recipe recommendations</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold">Billing History</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <div>
                    <p className="font-medium">June 2024</p>
                    <p className="text-sm text-muted-foreground">Pro Plan</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$9.99</p>
                    <Button variant="ghost" size="sm">Download</Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <div>
                    <p className="font-medium">May 2024</p>
                    <p className="text-sm text-muted-foreground">Pro Plan</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$9.99</p>
                    <Button variant="ghost" size="sm">Download</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

