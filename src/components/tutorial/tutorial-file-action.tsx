import { Button, Icon } from '@chakra-ui/react'
import { useSandpack } from '@codesandbox/sandpack-react'
import {
  RiFileAddLine,
  RiFileEditLine,
  RiFileReduceLine,
  RiFileTransferLine,
} from 'react-icons/ri'
import { formatFilePath } from './utils'
import { InlineCode } from 'components/mdx-components/inline-code'

interface TutorialFileActionProps {
  type: 'open' | 'add' | 'delete' | 'update'
  path: string
  label?: string
  code?: string
}

export const TutorialFileAction = ({
  type,
  path,
  label,
  code = '',
}: TutorialFileActionProps) => {
  const { sandpack } = useSandpack()

  const icons = {
    open: RiFileTransferLine,
    add: RiFileAddLine,
    delete: RiFileReduceLine,
    update: RiFileEditLine,
  }

  return (
    <InlineCode
      as={Button}
      leftIcon={<Icon as={icons[type]} />}
      h={6}
      lineHeight='2'
      onClick={() => {
        switch (type) {
          case 'open':
            sandpack.openFile(path)
            break
          case 'add':
          case 'update':
            sandpack.updateFile(path, code)
            sandpack.openFile(path)
            break
          case 'delete':
            sandpack.closeFile(path)
            sandpack.deleteFile(path)
            break
          default:
            // eslint-disable-next-line no-console
            console.log('Please select a valid type.')
            break
        }
      }}
    >
      {label || formatFilePath(path)}
    </InlineCode>
  )
}
