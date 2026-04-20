import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import type { AccordionWrapItem } from "@/types";

interface Props {
  items: AccordionWrapItem[];
}

export function AccordionWrap({ items }: Props) {
  return (
    <Accordion type="single" collapsible>
      {items.map((item) => (
        <AccordionItem
          key={item.value}
          value={item.value}
          className="group-data-[variant=yellow]:data-open:bg-muted/10 group-data-[variant=light]:data-open:bg-muted/10"
        >
          <AccordionTrigger className="group-data-[variant=yellow]:[&_svg]:text-black group-data-[variant=light]:[&_svg]:text-black">
            {item.trigger}
          </AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
