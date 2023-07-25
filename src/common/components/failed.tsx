import { Button, Center, Stack, Title } from "@mantine/core"
import { HeroTitle } from "./hero-title/hero-title"

export const FailedPage = () => {
  return (
    <Center maw={700} h={400} mx="auto">
      <Stack align="center">
        <HeroTitle title="Oooops... Failed to load data" center/>
        <Button
          onClick={() => window.location.reload()}
        >Try again</Button>
      </Stack>
    </Center>
  )
}