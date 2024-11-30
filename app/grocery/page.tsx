"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { PlusCircle, ArrowUpDown, ShoppingCart, Trash2 } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Sample data for the tables
const inventoryItems = [
  { id: 1, name: "Milk", quantity: 1, unit: "gallon", expiryDate: "2023-12-01" },
  { id: 2, name: "Eggs", quantity: 12, unit: "pcs", expiryDate: "2023-11-25" },
  { id: 3, name: "Bread", quantity: 1, unit: "loaf", expiryDate: "2023-11-20" },
  { id: 4, name: "Apples", quantity: 5, unit: "pcs", expiryDate: "2023-11-30" },
]

const vendors = [
  "Costco", "Walmart", "Target", "US Foods", "Kroger", 
  "PepsiCo", "Amazon Fresh", "Sysco", "McLane", "Albertsons"
]

const initialShoppingItems = [
  { 
    id: 1, 
    name: "Chicken Breast", 
    quantity: 2, 
    unit: "lbs", 
    prices: {
      "Costco": 5.99,
      "Walmart": 6.49,
      "Target": 6.99,
      "Amazon Fresh": 7.49,
      "Kroger": 6.29,
    }
  },
  { 
    id: 2, 
    name: "Pasta", 
    quantity: 1, 
    unit: "pack", 
    prices: {
      "Costco": 2.49,
      "Walmart": 2.29,
      "Target": 2.59,
      "Amazon Fresh": 2.79,
      "Kroger": 2.39,
    }
  },
  { 
    id: 3, 
    name: "Tomatoes", 
    quantity: 4, 
    unit: "pcs", 
    prices: {
      "Costco": 1.99,
      "Walmart": 1.89,
      "Target": 2.09,
      "Amazon Fresh": 2.29,
      "Kroger": 1.95,
    }
  },
  { 
    id: 4, 
    name: "Olive Oil", 
    quantity: 1, 
    unit: "bottle", 
    prices: {
      "Costco": 7.99,
      "Walmart": 8.49,
      "Target": 8.99,
      "Amazon Fresh": 9.49,
      "Kroger": 8.29,
    }
  },
]

type Vendor = "Costco" | "Walmart" | "Target" | "Amazon Fresh" | "Kroger";

export default function Grocery() {
  const [activeTab, setActiveTab] = useState("inventory")
  const [selectedVendor, setSelectedVendor] = useState<Vendor>("Costco")
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [checkedItems, setCheckedItems] = useState<number[]>([])
  const [checkedInventoryItems, setCheckedInventoryItems] = useState<number[]>([])
  const [isAnyInventoryItemChecked, setIsAnyInventoryItemChecked] = useState(false)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [isAnyShoppingItemChecked, setIsAnyShoppingItemChecked] = useState(false)
  const [itemVendors, setItemVendors] = useState<{ [key: number]: Vendor }>(
    Object.fromEntries(initialShoppingItems.map(item => [item.id, selectedVendor]))
  )
  const [itemQuantities, setItemQuantities] = useState<{ [key: number]: number }>(
    Object.fromEntries(initialShoppingItems.map(item => [item.id, item.quantity]))
  )
  const [shoppingItems, setShoppingItems] = useState(initialShoppingItems)
  const [isNextDialogOpen, setIsNextDialogOpen] = useState(false)

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const handleItemCheck = (id: number) => {
    const newCheckedItems = checkedItems.includes(id)
      ? checkedItems.filter(item => item !== id)
      : [...checkedItems, id]
    setCheckedItems(newCheckedItems)
    setIsAnyShoppingItemChecked(newCheckedItems.length > 0)
  }

  const handleCheckAll = () => {
    if (checkedItems.length === shoppingItems.length) {
      setCheckedItems([])
      setIsAnyShoppingItemChecked(false)
    } else {
      setCheckedItems(shoppingItems.map(item => item.id))
      setIsAnyShoppingItemChecked(true)
    }
  }

  const handleVendorChange = (vendor: Vendor) => {
    setSelectedVendor(vendor)
    setItemVendors(Object.fromEntries(shoppingItems.map(item => [item.id, vendor as Vendor])))
  }

  const handleItemVendorChange = (itemId: number, vendor: Vendor) => {
    setItemVendors(prev => ({ ...prev, [itemId]: vendor }))
  }

  const handleQuantityChange = (itemId: number, quantity: number) => {
    setItemQuantities(prev => ({ ...prev, [itemId]: quantity }))
  }

  const handleDeleteItem = (itemId: number) => {
    setShoppingItems(prevItems => prevItems.filter(item => item.id !== itemId))
    setCheckedItems(prevChecked => prevChecked.filter(id => id !== itemId))
    setItemVendors(prevVendors => {
      const newVendors = { ...prevVendors }
      delete newVendors[itemId]
      return newVendors
    })
    setItemQuantities(prevQuantities => {
      const newQuantities = { ...prevQuantities }
      delete newQuantities[itemId]
      return newQuantities
    })
  }

  const handleCheckAllInventory = () => {
    if (checkedInventoryItems.length === inventoryItems.length) {
      setCheckedInventoryItems([])
      setIsAnyInventoryItemChecked(false)
    } else {
      setCheckedInventoryItems(inventoryItems.map(item => item.id))
      setIsAnyInventoryItemChecked(true)
    }
  }

  const handleInventoryItemCheck = (id: number) => {
    const newCheckedItems = checkedInventoryItems.includes(id)
      ? checkedInventoryItems.filter(item => item !== id)
      : [...checkedInventoryItems, id]
    setCheckedInventoryItems(newCheckedItems)
    setIsAnyInventoryItemChecked(newCheckedItems.length > 0)
  }

  const handleAddToShopping = () => {
    // Add logic to add checked inventory items to shopping list
    console.log("Add to shopping clicked")
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Grocery Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="inventory">User Grocery Inventory</TabsTrigger>
              <TabsTrigger value="shopping">Shopping Online</TabsTrigger>
            </TabsList>
            <TabsContent value="inventory">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Inventory Items</h2>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Item
                  </Button>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleCheckAllInventory} variant="outline">
                    {checkedInventoryItems.length === inventoryItems.length ? 'Uncheck All' : 'Check All'}
                  </Button>
                  {isAnyInventoryItemChecked && (
                    <Button variant="outline" onClick={() => setIsPopupOpen(true)}>
                      Update Quantity
                    </Button>
                  )}
                  <Button variant="outline">
                    Scan from Phone
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">Select</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Expiry Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventoryItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Checkbox
                            checked={checkedInventoryItems.includes(item.id)}
                            onCheckedChange={() => handleInventoryItemCheck(item.id)}
                          />
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.unit}</TableCell>
                        <TableCell>{item.expiryDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {checkedInventoryItems.length > 0 && (
                  <div className="flex justify-end">
                    <Button onClick={handleAddToShopping}>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Shopping
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="shopping">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Shopping List</h2>
                  <div className="flex items-center space-x-2">
                    <Select value={selectedVendor} onValueChange={handleVendorChange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Vendor" />
                      </SelectTrigger>
                      <SelectContent>
                        {vendors.map((vendor) => (
                          <SelectItem key={vendor} value={vendor}>
                            {vendor}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Item
                    </Button>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleCheckAll} variant="outline">
                    {checkedItems.length === shoppingItems.length ? 'Uncheck All' : 'Check All'}
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">Select</TableHead>
                      <TableHead>
                        <DropdownMenu>
                          <DropdownMenuTrigger className="flex items-center">
                            Name
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleSort('name')}>
                              Sort by Name
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead>
                        <DropdownMenu>
                          <DropdownMenuTrigger className="flex items-center">
                            Price
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleSort('price')}>
                              Sort by Price
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {shoppingItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Checkbox
                            checked={checkedItems.includes(item.id)}
                            onCheckedChange={() => handleItemCheck(item.id)}
                          />
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={itemQuantities[item.id]}
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                            className="w-20"
                            min="1"
                          />
                        </TableCell>
                        <TableCell>{item.unit}</TableCell>
                        <TableCell>
                          <Select value={itemVendors[item.id]} onValueChange={(vendor) => handleItemVendorChange(item.id, vendor)}>
                            <SelectTrigger className="w-[120px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {vendors.map((vendor) => (
                                <SelectItem key={vendor} value={vendor}>
                                  {vendor}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>${(item.prices[itemVendors[item.id]] * itemQuantities[item.id]).toFixed(2) || 'N/A'}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteItem(item.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {isAnyShoppingItemChecked && (
                  <div className="flex justify-end">
                    <Dialog open={isNextDialogOpen} onOpenChange={setIsNextDialogOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          Next
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Choose an action</DialogTitle>
                          <DialogDescription>
                            Select what you'd like to do with your grocery list.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <ul className="space-y-2">
                            <li>
                              <label className="flex items-center space-x-2">
                                <input type="radio" name="action" value="checkout" className="form-radio" />
                                <span>Checkout</span>
                              </label>
                            </li>
                            <li>
                              <label className="flex items-center space-x-2">
                                <input type="radio" name="action" value="print" className="form-radio" />
                                <span>Print Grocery List</span>
                              </label>
                            </li>
                            <li>
                              <label className="flex items-center space-x-2">
                                <input type="radio" name="action" value="print-and-delete" className="form-radio" />
                                <span>Print Grocery List and Delete from table</span>
                              </label>
                            </li>
                          </ul>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsNextDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={() => {
                            console.log("Proceed clicked")
                            setIsNextDialogOpen(false)
                          }}>
                            Proceed
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

