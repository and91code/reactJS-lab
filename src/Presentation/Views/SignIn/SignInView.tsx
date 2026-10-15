import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { formActionSignIn } from "./actions";

export default function SignInView() {
  return (
    <div className="w-full h-full flex [&>*]:m-auto">
      <div className="p-4 border-[1px] border-color rounded">
        <h2 className="text-color font-bold text-2xl mb-4 border-b-[1px] border-color pb-2">
          SignIn
        </h2>

        <form action={formActionSignIn} className="flex flex-col gap-4">
          <div className="input-control">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" />
          </div>

          <div className="flex justify-end">
            {/* <button type="submit">Entrar</button> */}
            <Button type="submit">Entrar</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
