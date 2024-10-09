import { useFormStatus } from "react-dom"

export default function SubmitButton() {
    const {pending} = useFormStatus()
    return(
        <button className="border-black border-2 rounded-lg bg-green-200" type="submit">
        {pending ? "Updating Dashboard.." : "Submit" }
      </button>
    )
}