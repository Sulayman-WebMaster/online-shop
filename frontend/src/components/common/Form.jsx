import React from 'react';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

const Form = ({ formcontrols, formData, setFormData, onSubmit, buttonText }) => {
    
   function renderInput(getControlItem) {
        let element = null;
        const value = formData[getControlItem.name] || ''; // Ensure value is always defined

        switch (getControlItem.componentType) {
            case "input":
                element = (
                    <Input
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.name}
                        type={getControlItem.type}
                        value={value}
                        onChange={(event) => setFormData({
                            ...formData,
                            [getControlItem.name]: event.target.value
                        })}
                    />
                );
                break;

            case "textarea":
                element = (
                    <Textarea
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.id}
                        value={value}
                        onChange={(event) => setFormData({
                            ...formData,
                            [getControlItem.name]: event.target.value
                        })}
                    />
                );
                break;

            case "select":
                element = (
                    <Select 
                        onValueChange={(value) => setFormData({
                            ...formData,
                            [getControlItem.name]: value
                        })} 
                        value={value}
                    >
                        <SelectTrigger className='w-full'>
                            <SelectValue placeholder={getControlItem.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {getControlItem.options?.map(optionItem => (
                                <SelectItem key={optionItem.id} value={optionItem.id}>
                                    {optionItem.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );
                break;

            default:
                element = (
                    <Input
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.name}
                        type={getControlItem.type}
                        value={value}
                        onChange={(event) => setFormData({
                            ...formData,
                            [getControlItem.name]: event.target.value
                        })}
                    />
                );
                break;
        }
        return element;
    }

  return (
    <form onSubmit={onSubmit}>
        <div className='flex flex-col gap-3'>
            {formcontrols.map(controlItem => (
                <div className="grid w-full gap-1.5" key={controlItem.name}>
                    <label>{controlItem.label}</label>
                    {renderInput(controlItem)}
                </div>
            ))}
        </div>
        <Button type="submit" className="mt-2 w-full">
            {buttonText || "Submit"}
        </Button>
    </form>
  );
}

export default Form;
