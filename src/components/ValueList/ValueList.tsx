import { Container, Divider, Header, List } from "semantic-ui-react";

type ValueListProps = {
  title: string;
  values: {
    name: string;
    value?: string;
  }[];
};

export default function ValueList({ title, values }: ValueListProps) {
  return (
    <>
      <Divider horizontal>
        <Header as="h3" id="preview-left-col-header">
          {title}
        </Header>
      </Divider>
      <Container>
        <List bulleted id="preview-list">
          {values.map(({ name, value }) => (
            <List.Item key={name} id="preview-list-item">
              {name}
              {value ? ` - ${value}` : ""}
            </List.Item>
          ))}
        </List>
      </Container>
    </>
  );
}
