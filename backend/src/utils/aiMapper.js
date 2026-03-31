export const mapDetectionToIssue = (detections) => {

  if (!detections || detections.length === 0) {
    return {
      category: "unknown",
      priority: "low"
    }
  }

  const label = detections[0].label

  const mapping = {
    car: { category: "road blockage", priority: "medium" },
    truck: { category: "road blockage", priority: "medium" },
    person: { category: "public activity", priority: "low" },
    bicycle: { category: "traffic issue", priority: "low" }
  }

  return mapping[label] || {
    category: "general issue",
    priority: "low"
  }
}