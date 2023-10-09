import React, {useState} from 'react'

const CommentForm = ({
  btnLabel,
  formSubmitHandler,
  formCancelHandler=null,
  initialText="",
}) => {
  const [value,setValue] = useState(initialText);

  // when click the button to submit, the formsubmithandler will save the value and we
  // set the value to blank
  const submitHandler = (e) => {
    e.preventDefault();
    formSubmitHandler(value);
    setValue("");
  }

  return (
    <form onSubmit={submitHandler}>
      <div className='flex flex-col items-end border border-primary rounded-lg p-4'>
        <textarea 
          className='w-full focus:outline-none bg-transparent'
          rows="5"
          placeholder='Place your comments here'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className='flex items-center gap-x-2 pt-2'>
          {formCancelHandler && (
            <button
              onClick={formCancelHandler}
              className='px-6 py-2.5 rounded-lg border border-red-500 text-red-500'
            >
              Cancel
            </button>
          )}
          <button type='submit'
            className='px-6 py-2.5 rounded bg-primary'
          >
            {btnLabel}
          </button>
        </div>
      </div>
    </form>
  )
}

export default CommentForm