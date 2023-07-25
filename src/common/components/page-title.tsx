import { Title } from "@mantine/core"

interface Props {
  pageTitle: string;
  size? : number;
}

export function PageTitleComponent({ pageTitle, size }: Props) {
  return (
    <Title order={1} size={size || 35} align="center" pt={30} pb={65} fw={800}>{pageTitle}</Title>
  )
}
