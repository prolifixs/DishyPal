import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, MessageSquare, ThumbsUp, User } from 'lucide-react'

const notifications = [
  {
    id: 1,
    type: "like",
    content: "Jane Doe liked your recipe",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    type: "comment",
    content: "New comment on your Pasta Carbonara recipe",
    time: "5 hours ago",
    read: true,
  },
  {
    id: 3,
    type: "follow",
    content: "Chef Mario started following you",
    time: "1 day ago",
    read: false,
  },
  {
    id: 4,
    type: "system",
    content: "Your account was successfully verified",
    time: "3 days ago",
    read: true,
  },
]

export default function NotificationsPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <Button variant="outline">Mark all as read</Button>
      </div>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card key={notification.id}>
            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
              <div className="bg-primary/10 p-2 rounded-full">
                {notification.type === "like" && <ThumbsUp className="h-4 w-4" />}
                {notification.type === "comment" && <MessageSquare className="h-4 w-4" />}
                {notification.type === "follow" && <User className="h-4 w-4" />}
                {notification.type === "system" && <Bell className="h-4 w-4" />}
              </div>
              <div className="flex-1">
                <CardTitle className="text-sm font-medium">
                  {notification.content}
                </CardTitle>
                <p className="text-xs text-muted-foreground">{notification.time}</p>
              </div>
              {!notification.read && (
                <Badge variant="secondary">New</Badge>
              )}
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}

