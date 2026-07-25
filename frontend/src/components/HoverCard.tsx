import {
  HoverCard as HoverCardGlobal,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { UserRound } from "lucide-react";
import { Separator } from "./ui/separator";
import { NavLink } from "react-router-dom";
const HOVER_CARD_SIDES = ["bottom"] as const;

export const HoverCard = () => {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {HOVER_CARD_SIDES.map((side) => (
        <HoverCardGlobal key={side}>
          <HoverCardTrigger
            delay={100}
            closeDelay={100}
            render={<UserRound />}
          />
          <HoverCardContent side={side}>
            <div className="flex flex-col gap-1">
              <>
                <NavLink
                  to="/register"
                  className="font-normal text-gray-600 hover:text-black"
                >
                  Resgistrarse
                </NavLink>
                <Separator />
                <NavLink
                  to="/login"
                  className="font-normal text-gray-600 hover:text-black"
                >
                  Iniciar Sesion
                </NavLink>
                <Separator />
                {/* Aqui deberi ir Cerrar Sesion */}
              </>
            </div>
          </HoverCardContent>
        </HoverCardGlobal>
      ))}
    </div>
  );
};

export default HoverCard;
