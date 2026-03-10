import { TableBody, TableCell, TableRow } from 'crm-project-ui'

const SKELETON_ROWS = 6

const SkeletonCell = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse rounded bg-neutral-100 ${className}`} />
)

export const ContactsTableSkeleton = () => {
  return (
    <TableBody>
      {Array.from({ length: SKELETON_ROWS }).map((_, i) => (
        <TableRow key={i} className="pointer-events-none">
          <TableCell>
            <div className="ml-1.5 flex items-center gap-3">
              <SkeletonCell className="h-8 w-8 rounded-md" />
              <div className="flex flex-col gap-1.5">
                <SkeletonCell className="h-3.5 w-28" />
                <SkeletonCell className="h-3 w-36" />
              </div>
            </div>
          </TableCell>
          <TableCell>
            <SkeletonCell className="h-5 w-16 rounded-full" />
          </TableCell>
          <TableCell>
            <SkeletonCell className="h-3.5 w-24" />
          </TableCell>
          <TableCell>
            <SkeletonCell className="h-3.5 w-20" />
          </TableCell>
          <TableCell>
            <SkeletonCell className="h-3.5 w-20" />
          </TableCell>
          <TableCell>
            <SkeletonCell className="h-3.5 w-24" />
          </TableCell>
          <TableCell>
            <SkeletonCell className="h-3.5 w-24" />
          </TableCell>
          <TableCell>
            <SkeletonCell className="h-6 w-6 rounded-md" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}
