import LayoutDefault from "@/@core/presentation/layout/LayoutDefault";

export default function Template({ children }: { children: React.ReactNode }) {
  return <div>
    <LayoutDefault>
      {children}
    </LayoutDefault>
  </div>
}