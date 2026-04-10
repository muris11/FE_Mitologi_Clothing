"use client";

import { TeamMember } from "lib/api/types";
import { storageUrl } from "lib/utils/storage-url";
import { MotionSection } from "components/ui/motion";

interface TeamNode extends TeamMember {
  children: TeamNode[];
}

function buildTree(members: TeamMember[]): TeamNode[] {
  const map = new Map<number, TeamNode>();
  const roots: TeamNode[] = [];

  // Initialize all nodes
  for (const m of members) {
    map.set(m.id, { ...m, children: [] });
  }

  // Build parent-child relationships
  for (const m of members) {
    const node = map.get(m.id)!;
    if (m.parentId && map.has(m.parentId)) {
      map.get(m.parentId)!.children.push(node);
    } else {
      roots.push(node);
    }
  }

  return roots;
}

function MemberCard({
  member,
  isFounder = false,
}: {
  member: TeamNode;
  isFounder?: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      {/* Photo — natural size, no effects */}
      <div
        className={`overflow-hidden bg-white rounded-2xl shrink-0
        ${isFounder ? "border border-mitologi-navy/20 shadow-md" : "border border-slate-100 shadow-sm"}`}
      >
        {member.photoUrl ? (
          <img
            src={storageUrl(member.photoUrl)}
            alt={member.name}
            className={`block object-contain ${isFounder ? "w-32 md:w-64" : "w-24 md:w-48"}`}
          />
        ) : (
          <div
            className={`flex items-center justify-center bg-slate-50 text-mitologi-navy
            ${isFounder ? "w-32 h-32 md:w-64 md:h-64" : "w-24 h-24 md:w-48 md:h-48"}`}
          >
            <span
              className={`font-sans font-bold ${isFounder ? "text-4xl md:text-7xl" : "text-2xl md:text-5xl"}`}
            >
              {member.name
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)}
            </span>
          </div>
        )}
      </div>

      {/* Name & Position */}
      <h4
        className={`font-sans font-bold text-mitologi-navy text-center mt-4 md:mt-5 leading-tight tracking-tight
        ${isFounder ? "text-sm md:text-xl" : "text-[13px] md:text-base"}`}
      >
        {member.name}
      </h4>
      <p
        className={`text-slate-500 font-sans font-medium text-center mt-1 md:mt-1.5 uppercase tracking-widest
        ${isFounder ? "text-[11px] md:text-sm text-mitologi-gold font-bold" : "text-[9px] md:text-xs"}`}
      >
        {member.position}
      </p>
    </div>
  );
}

function TreeLevel({
  nodes,
  isRoot = false,
}: {
  nodes: TeamNode[];
  isRoot?: boolean;
}) {
  if (nodes.length === 0) return null;

  return (
    <div className="flex flex-col items-center">
      {/* Members at this level */}
      <div
        className={`flex flex-nowrap justify-center ${isRoot ? "gap-6 md:gap-12" : "gap-4 md:gap-8"}`}
      >
        {nodes.map((node) => (
          <div key={node.id} className="flex flex-col items-center relative">
            {/* Vertical connector from parent */}
            {!isRoot && <div className="w-px h-8 bg-mitologi-gold/30" />}

            <MemberCard member={node} isFounder={isRoot && node.level === 0} />

            {/* Children */}
            {node.children.length > 0 && (
              <div className="flex flex-col items-center mt-6">
                {/* Vertical line down */}
                <div className="w-px h-8 bg-mitologi-gold/30" />

                {/* Horizontal connector */}
                {node.children.length > 1 && (
                  <div className="relative w-full flex justify-center">
                    <div
                      className="h-px bg-mitologi-gold/30 absolute"
                      style={{
                        width: `calc(100% - ${100 / node.children.length}%)`,
                        top: 0,
                      }}
                    />
                  </div>
                )}

                <TreeLevel nodes={node.children} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TeamStructure({ teamMembers }: { teamMembers?: TeamMember[] }) {
  if (!teamMembers || teamMembers.length === 0) return null;

  const tree = buildTree(teamMembers);

  return (
    <MotionSection className="relative py-24 sm:py-32 bg-slate-50 border-y border-slate-200/50 overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <p className="text-sm font-sans font-bold text-mitologi-navy uppercase tracking-widest mb-4 inline-block bg-mitologi-navy/5 px-4 py-1.5 rounded-full">
            Tim Kami
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold text-mitologi-navy mb-6 tracking-tight">
            Struktur Organisasi
          </h2>
          <p className="text-slate-600 font-sans font-medium text-base md:text-lg">
            Kenali tim profesional di balik setiap produk berkualitas dari
            perusahaan kami.
          </p>
        </div>

        {/* Org Chart */}
        <div className="overflow-x-auto pb-12 scrollbar-hide">
          <div className="w-max min-w-full flex justify-center pt-8 px-4">
            <TreeLevel nodes={tree} isRoot />
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
