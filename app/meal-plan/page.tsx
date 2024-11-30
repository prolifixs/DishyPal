"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon } from 'lucide-react'

type Meal = {
  id: number
  name: string
  type: "breakfast" | "lunch" | "dinner"
  date: Date
}

const initialMeals: Meal[] = [
  { id: 1, name: "Oatmeal with Berries", type: "breakfast", date: new Date(2023, 11, 1) },
  { id: 2, name: "Chicken Salad", type: "lunch", date: new Date(2023, 11, 1) },
  { id: 3, name: "Grilled Salmon", type: "dinner", date: new Date(2023, 11, 1) },
]

export default function MealPlanPage() {
  const [meals, setMeals] = useState<Meal[]>(initialMeals)
  const [newMeal, setNewMeal] = useState<Partial<Meal>>({})
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const handleAddMeal = () => {
    if (newMeal.name && newMeal.type && selectedDate) {
      setMeals([...meals, { id: Date.now(), ...newMeal as Meal, date: selectedDate }])
      setNewMeal({})
    }
  }

  const filteredMeals = meals.filter(
    (meal) => meal.date.toDateString() === selectedDate?.toDateString()
  )

  return (
    <div className="grid grid-cols-3 gap-6">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Meal Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {selectedDate?.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Add Meal</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Meal</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="meal-name" className="text-right">
                      Meal Name
                    </Label>
                    <Input
                      id="meal-name"
                      value={newMeal.name || ""}
                      onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="meal-type" className="text-right">
                      Meal Type
                    </Label>
                    <Select onValueChange={(value) => setNewMeal({ ...newMeal, type: value as Meal['type'] })}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select meal type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="breakfast">Breakfast</SelectItem>
                        <SelectItem value="lunch">Lunch</SelectItem>
                        <SelectItem value="dinner">Dinner</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={handleAddMeal}>Add Meal</Button>
              </DialogContent>
            </Dialog>
          </div>
          <div className="space-y-4">
            {filteredMeals.map((meal) => (
              <Card key={meal.id}>
                <CardHeader>
                  <CardTitle>{meal.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="capitalize">{meal.type}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
          />
        </CardContent>
      </Card>
    </div>
  )
}

