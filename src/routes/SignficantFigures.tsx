import LinkRouter from "../LinkRouter"

function SignficantFigures() {
  
    return (
      <>
        <h2>Significant Figures</h2>
          <p>
            The WeBWorK macros we provide will track significant figures for any values entered into an <LinkRouter as="Link" href={'/inexactValue'}>InexactValue</LinkRouter> object or subclassed object.
          </p>
        
      </>
    )
  }
  
  export default SignficantFigures
  