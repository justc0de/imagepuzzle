package com.justc0de.imagepuzzle;

import java.util.Date;
import java.util.List;

public interface DataStorage {
	
	public List<TimeEntry> getTopTimes();
	public Date getTopTimeForGridSize(int gridSize);
	public void setTopTimeForGridSize(TimeEntry timeEntry);
}