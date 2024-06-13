import CreateProductForm from "./components/CreateProductForm";
import NavComponent from "./components/NavComponent";

const App = () => {
  return (
    <div>
      <NavComponent />
      <div className="container mx-auto p-5 lg:w-2/3 lg:p-2">
        <CreateProductForm />
      </div>
    </div>
  );
};
export default App;