import React from 'react'

const Input = (props) => {
	return (
		<div className="form-group">
			<label className={props.error ? "text-danger" : ""} htmlFor="username">{props.display}</label>
			<input onChange={props.onChange} name={props.name} value={props.value} type={props.type} className={"form-control " + (props.error ? "is-invalid" : "")} id={props.name} aria-describedby={props.name} placeholder={props.display} />
			{props.error ? <div className="invalid-feedback">{props.error}</div> : (<div className="valid-tooltip">{props.name} is valid!</div>)}
		</div>
	)
}

export default Input
