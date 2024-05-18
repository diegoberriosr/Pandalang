import { Button } from "./components/general/ButtonCVA.tsx";
function App() {
  return (
    <div className='max-w-[200px] flex flex-col mx-auto space-y-5 mt-2.5'>
      <Button>
        Default
      </Button>
      <Button variant='primary'>
        Primary
      </Button>
      <Button variant='secondary'>
        Secondary
      </Button>
      <Button variant='tertiary'>
        Tertiary
      </Button>    
      <Button variant='yellow' size='sm'>
        Yellow
      </Button>
      <Button variant='red' size='lg'>
        Red
      </Button>
    </div>
  );
}

export default App;
