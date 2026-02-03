import { createFileRoute } from "@tanstack/react-router";
import { Button, Input, Label } from "crm-project-ui";
import { Edit, Edit2, Phone, User } from "lucide-react";
import { useForm } from "react-hook-form";

export const Route = createFileRoute("/_app/organization/")({
  component: RouteComponent,
});

type OrganizationForm = {
  name: string;
  slug: string;
  email: string;
  phone: string;
  webSite: string;
  cnpj: string;
};

function RouteComponent() {
  const { register, handleSubmit, setError } = useForm<OrganizationForm>();

  const handleFormSubmit = () => {};
  return (
    <div className="min-h-screen w-full">
      <div className="w-[95%] mx-auto flex flex-col gap-2 bg-gray-50 shadow-md shadow-gray-50 p-10 relative">
        <Button disabled className="absolute top-5 right-5 text-white font-medium">
          Salvar
        </Button>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="text-2xl text-gray-800 flex items-center gap-1">
            <User size={25} />
            Informações básicas
          </div>
          <div className="bg-white flex flex-wrap justify-between gap-4 p-6 rounded-xl shadow-md shadow-stone-200 relative">
            <button className="absolute top-2 right-2 text-blue-600 h-5 w-5">
              <Edit size={18} />
            </button>
            <div className="flex w-[45%] flex-col gap-2">
              <Label>Nome</Label>
              <Input
                className="w-full"
                disabled
                defaultValue={"Luis Org"}
                {...register("name")}
              />
            </div>
            <div className="flex w-1/2 flex-col gap-2">
              <Label>Razão Social</Label>
              <Input
                className="w-full"
                disabled
                defaultValue={"Luis Testando"}
                {...register("slug")}
              />
            </div>
            <div className="flex w-[45%] flex-col gap-2">
              <Label>Cnpj</Label>
              <Input
                disabled
                defaultValue={"000/0000/000/000"}
                {...register("cnpj")}
              />
            </div>
          </div>
          <div className="text-2xl text-gray-800 flex items-center gap-1">
            <Phone size={25} />
            Informações de Contato
          </div>
          <div className="bg-white flex flex-wrap justify-between gap-4 p-6 rounded-xl shadow-md shadow-stone-200 relative">
            <button className="absolute top-2 right-2 h-5 w-5 text-blue-600">
              <Edit size={18} />
            </button>
            <div className="flex flex-col gap-2 w-[45%]">
              <Label>Telefone</Label>
              <Input
                disabled
                defaultValue={"1998283773"}
                {...register("phone")}
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <Label>WebSite</Label>
              <Input
                disabled
                defaultValue={"www.site.com"}
                {...register("webSite")}
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Label>Email</Label>
              <Input
                disabled
                defaultValue={"email.com"}
                {...register("webSite")}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
