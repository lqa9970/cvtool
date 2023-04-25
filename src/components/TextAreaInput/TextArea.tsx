import { TextArea, Grid } from 'semantic-ui-react';

import './TextArea.scss';

type TextAreaInputProps = {
    children: never[];
    value: string;
    name: string;
    placeholder: string;
    handleChange: {(e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;}
}

const TextAreaInput = ({value, name, placeholder, handleChange}: TextAreaInputProps) => {
    return (
        <Grid>
            <Grid.Column width={12}>
                <TextArea
                    name={name}
                    className="text-area"
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    style={{ minHeight: 100, minWidth: 500 }}
                    rows={6}
                    primary
                />
            </Grid.Column>
        </Grid>
    );
}

export default TextAreaInput;