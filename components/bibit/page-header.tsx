import { RefreshCw } from "lucide-react"

import { TeamDialog } from "@/components/bibit/team-dialog"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function PageHeader({
  loadingStatus,
  onRefresh,
}: {
  loadingStatus: boolean
  onRefresh: () => void
}) {
  return (
    <header className="flex flex-col gap-4 border-b-2 border-border pb-4 sm:pb-5 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        <h1 className="text-2xl leading-tight sm:text-5xl">
          Klasifikasi Kelayakan Bibit Padi
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 sm:mt-3 sm:text-lg sm:leading-7">
          Masukkan hasil pengukuran benih, lalu lihat apakah bibit masuk
          kategori unggul atau tidak unggul.
        </p>
        <div className="mt-4 flex items-center gap-2 lg:hidden">
          <TeamDialog />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                size="icon"
                variant="neutral"
                onClick={onRefresh}
                disabled={loadingStatus}
                aria-label="Perbarui data"
              >
                <RefreshCw
                  className={loadingStatus ? "animate-spin" : undefined}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Perbarui data</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div className="hidden lg:flex lg:items-center lg:gap-3">
        <TeamDialog />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              size="icon"
              variant="neutral"
              onClick={onRefresh}
              disabled={loadingStatus}
              aria-label="Perbarui data"
            >
              <RefreshCw className={loadingStatus ? "animate-spin" : undefined} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Perbarui data</TooltipContent>
        </Tooltip>
      </div>
    </header>
  )
}
