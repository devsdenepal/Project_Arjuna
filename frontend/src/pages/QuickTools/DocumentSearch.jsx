import React, { useState } from 'react';
import { googleSearch, logSearch } from '../../api/osintApi';

export default function DocumentSearch(){
	const [q, setQ] = useState('');
	const [loading, setLoading] = useState(false);
	const [err, setErr] = useState('');
	const [results, setResults] = useState({ pdf: [], docx: [], csv: [], xlsx: [] });

	const run = async (e) => {
		e.preventDefault();
		const query = (q || '').trim();
		if (!query) return;
		setLoading(true);
		setErr('');
		try {
			const types = ['pdf','docx','csv','xlsx'];
			const searches = types.map(t => googleSearch(`${query} filetype:${t}`));
			const data = await Promise.all(searches);
			const grouped = { pdf: [], docx: [], csv: [], xlsx: [] };
			types.forEach((t, i) => {
				grouped[t] = Array.isArray(data[i]) ? data[i] : [];
			});
			setResults(grouped);
			try { await Promise.all(types.map(t => logSearch('google', `${query} filetype:${t}`))); } catch {}
		} catch (e2) {
			setErr(e2?.message || 'Search failed');
		} finally {
			setLoading(false);
		}
	};

	const Section = ({ type, items }) => {
		if (!items || items.length === 0) return null;
		return (
			<div className="mb-4">
				<h6 className="mb-3 text-uppercase">{type.toUpperCase()} <span className="badge badge-secondary ml-2">{items.length}</span></h6>
				<div className="list-group">
					{items.map((it, idx) => (
						<a key={idx} href={it.link} target="_blank" rel="noopener noreferrer" className="list-group-item list-group-item-action">
							<div className="d-flex w-100 justify-content-between">
								<h6 className="mb-1" style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{it.title || it.link}</h6>
							</div>
							{it.snippet && <small className="text-muted" style={{display:'block',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{it.snippet}</small>}
							<small className="text-monospace text-muted" style={{display:'block',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{it.link}</small>
						</a>
					))}
				</div>
			</div>
		);
	};

	return (
		<div className="col-md-10 ml-sm-auto px-4 py-4">
			<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
				<h4 className="mb-0">Document Search</h4>
			</div>
			<form className="mb-4" onSubmit={run}>
				<div className="input-group">
					<input value={q} onChange={e=>setQ(e.target.value)} className="form-control" placeholder="Enter keywords, e.g. company name or subject" />
					<div className="input-group-append">
						<button disabled={loading} className="btn btn-primary" type="submit">{loading ? 'Searching…' : 'Search'}</button>
					</div>
				</div>
			</form>
			{err && <div className="alert alert-danger" role="alert">{err}</div>}
			<Section type="pdf" items={results.pdf} />
			<Section type="docx" items={results.docx} />
			<Section type="csv" items={results.csv} />
			<Section type="xlsx" items={results.xlsx} />
			{(!results.pdf.length && !results.docx.length && !results.csv.length && !results.xlsx.length && !loading && !err) && (
				<div className="text-muted">No results yet. Try a search above.</div>
			)}
		</div>
	);
}
