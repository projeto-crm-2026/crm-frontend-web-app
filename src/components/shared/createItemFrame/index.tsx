type CreateItemContainerProps = {
  title: string
  description: string
  buttonText: string
  onButtonClick: () => void
  icon?: React.ReactNode
  children?: React.ReactNode
}

export const CreateItemFrame = (props: CreateItemContainerProps) => {
  return (
    <div className="mb-4 flex items-center justify-center rounded-md border-4 border-dashed border-[#dbded4] px-6 py-8">
      <div className="flex w-full items-center justify-center gap-8 lg:gap-10">
        <figure className="max-w-[160px]">{props.children}</figure>
        <article className="flex max-w-xl flex-col gap-2">
          <h2 className="text-2xl font-bold">{props.title}</h2>
          <ul className="flex flex-col gap-1">
            <li className="text-base text-gray-600">{props.description}</li>
          </ul>
          <div className="mt-2 flex items-center gap-4">
            <button className="flex items-center justify-center gap-1.5 rounded-md border border-blue-400 bg-white px-3 py-1 text-base font-medium text-blue-500 transition-all duration-300 hover:bg-blue-50 disabled:pointer-events-none disabled:opacity-50">
              {props.icon}
              {props.buttonText}
            </button>
          </div>
        </article>
      </div>
    </div>
  )
}
