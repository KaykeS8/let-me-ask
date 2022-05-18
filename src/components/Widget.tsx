import { Popover } from "@headlessui/react"
import { ChatTeardropDots } from "phosphor-react"
import { WidgetForm } from "../components/WidgetForm"

export const Widget = () => {
  return (
    <Popover>
      <Popover className="absolute bottom-5 right-5 md:bottom-8 md:right-8 flex flex-col items-end">
        <Popover.Panel>
          <WidgetForm />
        </Popover.Panel>
        <Popover.Button className="bg-brand-300 rounded-full px-3 h-12 text-white flex items-center group">
          <ChatTeardropDots className="w-6 h-6" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition- duration-500 ease-linear">
            <span className="pl-2"></span>
            feedback</span>
        </Popover.Button>
      </Popover>
    </Popover>
  )
}