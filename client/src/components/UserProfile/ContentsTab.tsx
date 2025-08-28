import { useContent } from "@/contexts/ContentContext";

export default function ContentsTab() {
  const { userContents } = useContent();

  return (
    <div className="space-y-4">
      {userContents.length === 0 ? (
        <p className="text-gray-500 text-center">You haven't added any content yet.</p>
      ) : (
        userContents.map((content: any) => (
          <div key={content._id} className="border rounded-lg p-4 flex justify-between items-center hover:shadow-md transition-all">
            <div>
              <h3 className="font-semibold text-gray-800">{content.title}</h3>
              <p className="text-gray-500 text-sm">{content.category}</p>
            </div>
            <div className="text-sm text-gray-400">
              {new Date(content.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
