"use client"

import { UsersRound } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const teamMembers = [
  {
    name: "Angga Islami Pasya",
    nim: "2411081004",
  },
  {
    name: "Ihza Mahendra",
    nim: "2411082009",
  },
  {
    name: "Inayah Henni El Najla",
    nim: "2411081010",
  },
  {
    name: "Alya Dhiya Najla",
    nim: "2411081003",
  },
]

export function TeamDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="neutral" className="h-10 px-3 sm:px-4">
          <UsersRound />
          Team
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-secondary-background">
        <DialogHeader>
          <DialogTitle className="text-2xl">Data Tim</DialogTitle>
          <DialogDescription>
            Anggota pengembang sistem klasifikasi bibit padi.
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-hidden rounded-base border-2 border-border">
          <table className="w-full border-separate border-spacing-0 text-left text-sm sm:text-base">
            <thead>
              <tr className="bg-main text-main-foreground">
                <th className="border-b-2 border-border px-3 py-2 font-heading sm:px-4">
                  Nama
                </th>
                <th className="border-b-2 border-l-2 border-border px-3 py-2 font-heading sm:px-4">
                  NIM
                </th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member) => (
                <tr
                  key={member.nim}
                  className="even:bg-background last:[&>td]:border-b-0"
                >
                  <td className="border-b-2 border-border px-3 py-3 sm:px-4">
                    {member.name}
                  </td>
                  <td className="border-b-2 border-l-2 border-border px-3 py-3 font-heading sm:px-4">
                    {member.nim}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  )
}
