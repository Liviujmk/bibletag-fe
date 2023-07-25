import { Group, Badge } from "@mantine/core"

interface Props {
  data: string[] | undefined;
}

export const ArticleBadges = ({ data }: Props) => {
  return (
    <Group mb="xs">
      {
        data?.map((badge: string) => 
          <Badge color="dark" size="sm" radius="sm" variant="outline" key={badge}>{badge}</Badge>
        )
      }
    </Group>
  )
}