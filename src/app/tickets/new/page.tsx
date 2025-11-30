import NewTicketForm from "./ticket-form"

const NewTicketPage = () => {
  return (
    <div className='min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-50 p-8'>
      <div className='max-w-2xl mx-auto'>
        <NewTicketForm />
      </div>
    </div>
  )
}

export default NewTicketPage