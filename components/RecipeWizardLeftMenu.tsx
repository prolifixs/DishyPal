"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Bell, BellOff, Clock, Plus, Flame, Scissors, Blend } from 'lucide-react'

type Preset = {
  id: string;
  type: "timer";
  name: string;
  time: string;
  notifications: boolean;
  isRunning: boolean;
};

interface RecipeWizardLeftMenuProps {
  presets: Preset[];
  onPresetsChange: (presets: Preset[]) => void;
}

export default function RecipeWizardLeftMenu({ presets: initialPresets, onPresetsChange }: RecipeWizardLeftMenuProps) {
  const [timeRemaining, setTimeRemaining] = useState('00:00')
  const [openModal, setOpenModal] = useState(false)
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')
  const [openPresetModal, setOpenPresetModal] = useState(false)
  const [presetType, setPresetType] = useState('')
  const [presetName, setPresetName] = useState('')
  const [presetMinutes, setPresetMinutes] = useState('')
  const [presetSeconds, setPresetSeconds] = useState('')
  const [presetNotifications, setPresetNotifications] = useState(true)
  const [presets, setPresets] = useState<Preset[]>([])
  const timerRef = useRef<{ [key: string]: NodeJS.Timeout | null }>({})
  const [editingPresetId, setEditingPresetId] = useState<string | null>(null)

  useEffect(() => {
    setPresets(initialPresets)
  }, [initialPresets])

  const handleNotificationToggle = (presetId: string) => {
    setPresets(prev => prev.map(p => 
      p.id === presetId 
        ? { ...p, notifications: !p.notifications }
        : p
    ))
  }

  const handleOpenModal = (presetId: string) => {
    setEditingPresetId(presetId)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setEditingPresetId(null)
    setOpenModal(false)
    setMinutes('')
    setSeconds('')
  }

  const handleOpenPresetModal = () => setOpenPresetModal(true)
  const handleClosePresetModal = () => setOpenPresetModal(false)
  
  const handleSetTime = (presetId: string) => {
    const totalTime = `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`
    setPresets(prev => prev.map(p => 
      p.id === presetId 
        ? { ...p, time: totalTime }
        : p
    ))
    handleCloseModal()
  }

  const toggleTimer = (presetId: string) => {
    const preset = presets.find(p => p.id === presetId)
    if (!preset) return

    if (preset.isRunning) {
      if (timerRef.current[presetId]) {
        clearInterval(timerRef.current[presetId]!)
        timerRef.current[presetId] = null
      }
      setPresets(prev => prev.map(p => 
        p.id === presetId ? { ...p, isRunning: false } : p
      ))
      return
    }

    const id = setInterval(() => {
      setPresets(prev => {
        const updatedPresets = prev.map(p => {
          if (p.id !== presetId) return p
          
          const [mins, secs] = p.time.split(':').map(Number)
          const totalSeconds = mins * 60 + secs
          
          if (totalSeconds <= 0) {
            clearInterval(timerRef.current[presetId]!)
            timerRef.current[presetId] = null
            return { ...p, isRunning: false, time: '00:00' }
          }
          
          const newTotalSeconds = totalSeconds - 1
          const newMins = Math.floor(newTotalSeconds / 60)
          const newSecs = newTotalSeconds % 60
          return {
            ...p,
            time: `${String(newMins).padStart(2, '0')}:${String(newSecs).padStart(2, '0')}`
          }
        })
        
        return updatedPresets
      })
    }, 1000)

    timerRef.current[presetId] = id
    
    setPresets(prev => prev.map(p => 
      p.id === presetId ? { ...p, isRunning: true } : p
    ))
  }

  const getPresetIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'cook':
        return <Flame className="h-6 w-6" />
      case 'blend':
        return <Blend className="h-6 w-6" />
      case 'mince':
        return <Scissors className="h-6 w-6" />
      case 'burner':
        return <Flame className="h-6 w-6" />
      default:
        return <Clock className="h-6 w-6" />
    }
  }

  const handleCreatePreset = () => {
    const newPreset: Preset = {
      id: Date.now().toString(),
      type: "timer",
      name: presetName,
      time: `${presetMinutes.padStart(2, '0')}:${presetSeconds.padStart(2, '0')}`,
      notifications: presetNotifications,
      isRunning: false,
    }
    
    setPresets(prev => [...prev, newPreset])
    handleClosePresetModal()
    setPresetType('')
    setPresetName('')
    setPresetMinutes('')
    setPresetSeconds('')
    setPresetNotifications(true)
  }

  const handleDeletePreset = (presetId: string) => {
    if (timerRef.current[presetId]) {
      clearInterval(timerRef.current[presetId]!)
      timerRef.current[presetId] = null
    }
    setPresets(prev => prev.filter(p => p.id !== presetId))
  }

  useEffect(() => {
    const currentTimers = timerRef.current
    return () => {
      Object.values(currentTimers).forEach(timer => {
        if (timer) clearInterval(timer)
      })
    }
  }, [])

  const handleNumberInput = (value: string, setter: (value: string) => void) => {
    const num = parseInt(value)
    if (isNaN(num) || num < 0) {
      setter('0')
    } else {
      setter(value)
    }
  }

  const isPresetValid = () => {
    const totalSeconds = (parseInt(presetMinutes) || 0) * 60 + (parseInt(presetSeconds) || 0)
    return (
      presetType !== '' && 
      presetName.trim() !== '' && 
      totalSeconds > 0
    )
  }

  const isTimeValid = () => {
    const totalSeconds = (parseInt(minutes) || 0) * 60 + (parseInt(seconds) || 0)
    return totalSeconds > 0
  }

  const sortedPresets = [...(presets || [])].sort((a, b) => {
    const getPriority = (preset: Preset) => {
      if (preset.isRunning) return 0
      if (preset.time !== '00:00' && !preset.isRunning) return 1
      return 2
    }
    return getPriority(a) - getPriority(b)
  })

  return (
    <div className="h-[calc(100vh-80px)] w-[300px] sticky top-20 overflow-y-auto bg-white rounded-lg p-4">
      <div className="flex justify-end mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleOpenPresetModal}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {sortedPresets.map(preset => (
        <Card key={preset.id} className="mb-4">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">{preset.name}</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleNotificationToggle(preset.id)}
              >
                {preset.notifications ? (
                  <Bell className="h-4 w-4" />
                ) : (
                  <BellOff className="h-4 w-4" />
                )}
              </Button>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <span className="text-2xl font-bold mr-2">{preset.time}</span>
                <span className="text-sm text-muted-foreground">min remaining</span>
              </div>
              {!preset.isRunning && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleOpenModal(preset.id)}
                >
                  <Clock className="h-4 w-4" />
                </Button>
              )}
            </div>

            <Card className="mb-4 p-4 text-center">
              <div className="flex flex-col items-center justify-center h-20">
                {getPresetIcon(preset.type)}
                {preset.time === '00:00' && (
                  <p className="mt-2 font-medium truncate">
                    {preset.name} should be ready!
                  </p>
                )}
              </div>
            </Card>

            <div className="flex gap-2">
              {preset.time !== '00:00' && (
                <Button
                  variant={preset.isRunning ? "destructive" : "default"}
                  className="flex-1"
                  size="sm"
                  onClick={() => toggleTimer(preset.id)}
                >
                  {preset.isRunning ? 'Pause' : 'Start'}
                </Button>
              )}
              <Button
                variant="outline"
                className="flex-1"
                size="sm"
                onClick={() => handleDeletePreset(preset.id)}
              >
                Done
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Set Timer</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="minutes">Minutes</Label>
              <Input
                id="minutes"
                type="number"
                value={minutes}
                onChange={(e) => handleNumberInput(e.target.value, setMinutes)}
                min={0}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="seconds">Seconds</Label>
              <Input
                id="seconds"
                type="number"
                value={seconds}
                onChange={(e) => handleNumberInput(e.target.value, setSeconds)}
                min={0}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              onClick={() => editingPresetId && handleSetTime(editingPresetId)}
              disabled={!isTimeValid()}
            >
              Set Time
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={openPresetModal} onOpenChange={setOpenPresetModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create a preset</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="type">Type</Label>
              <Select value={presetType} onValueChange={setPresetType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cook">Cook</SelectItem>
                  <SelectItem value="blend">Blend</SelectItem>
                  <SelectItem value="mince">Mince</SelectItem>
                  <SelectItem value="burner">Burner</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="preset-name">Preset Name</Label>
              <Input
                id="preset-name"
                value={presetName}
                onChange={(e) => setPresetName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="preset-minutes">Minutes</Label>
                <Input
                  id="preset-minutes"
                  type="number"
                  value={presetMinutes}
                  onChange={(e) => handleNumberInput(e.target.value, setPresetMinutes)}
                  min={0}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="preset-seconds">Seconds</Label>
                <Input
                  id="preset-seconds"
                  type="number"
                  value={presetSeconds}
                  onChange={(e) => handleNumberInput(e.target.value, setPresetSeconds)}
                  min={0}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="notifications"
                checked={presetNotifications}
                onCheckedChange={setPresetNotifications}
              />
              <Label htmlFor="notifications">Enable Notifications</Label>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={handleClosePresetModal}>
              Cancel
            </Button>
            <Button
              onClick={handleCreatePreset}
              disabled={!isPresetValid()}
            >
              Set Preset
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

