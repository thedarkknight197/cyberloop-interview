import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {addTodo, todoSchema} from "@/store/todo";
import {useState} from "react";



export function AddTodo() {
    const [open, setOpen] = useState(false)
    const [error, setError] = useState<string | null>(null)


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const name = formData.get("name") as string

        const result = todoSchema.safeParse({ name })
        if (!result.success) {
            setError(result.error.issues[0].message)
            return
        }

        addTodo(result.data.name)
        setError(null)
        setOpen(false)
        event.currentTarget.reset()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button>Add Todo</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add todo</DialogTitle>
                        <DialogDescription>Add a new todo to your todo list!</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" />
                            {error && <p className="text-sm text-red-500">{error}</p>}
                        </div>
                    </div>
                    <DialogFooter className={"mt-4"}>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                    </form>
                </DialogContent>
        </Dialog>
    )
}
